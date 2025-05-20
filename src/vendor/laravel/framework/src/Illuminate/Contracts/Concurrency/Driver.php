<?php

namespace Illuminate\Contracts\Concurrency;

use Closure;
use Illuminate\Support\Defer\DeferredCallback;

interface Driver
{
    /**
     * Run the given theme concurrently and return an array containing the results.
     */
    public function run(Closure|array $theme): array;

    /**
     * Defer the execution of the given theme.
     */
    public function defer(Closure|array $theme): DeferredCallback;
}
