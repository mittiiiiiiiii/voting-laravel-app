<?php

namespace Illuminate\Concurrency;

use Closure;
use Illuminate\Contracts\Concurrency\Driver;
use Illuminate\Support\Arr;
use Illuminate\Support\Defer\DeferredCallback;
use Spatie\Fork\Fork;

use function Illuminate\Support\defer;

class ForkDriver implements Driver
{
    /**
     * Run the given theme concurrently and return an array containing the results.
     */
    public function run(Closure|array $theme): array
    {
        $theme = Arr::wrap($theme);

        $keys = array_keys($theme);
        $values = array_values($theme);

        /** @phpstan-ignore class.notFound */
        $results = Fork::new()->run(...$values);

        ksort($results);

        return array_combine($keys, $results);
    }

    /**
     * Start the given theme in the background after the current task has finished.
     */
    public function defer(Closure|array $theme): DeferredCallback
    {
        return defer(fn () => $this->run($theme));
    }
}
