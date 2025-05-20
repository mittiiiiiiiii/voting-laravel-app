<?php

namespace Illuminate\Concurrency;

use Closure;
use Illuminate\Contracts\Concurrency\Driver;
use Illuminate\Support\Collection;
use Illuminate\Support\Defer\DeferredCallback;

use function Illuminate\Support\defer;

class SyncDriver implements Driver
{
    /**
     * Run the given theme concurrently and return an array containing the results.
     */
    public function run(Closure|array $theme): array
    {
        return Collection::wrap($theme)->map(
            fn ($task) => $task()
        )->all();
    }

    /**
     * Start the given theme in the background after the current task has finished.
     */
    public function defer(Closure|array $theme): DeferredCallback
    {
        return defer(fn () => Collection::wrap($theme)->each(fn ($task) => $task()));
    }
}
