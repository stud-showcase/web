<?php

namespace App\Traits;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;

trait PaginatesCollections
{
    protected function formatPaginatedData(LengthAwarePaginator $paginator, callable $mapCallback): array
    {
        $paginator->setCollection($paginator->getCollection()->map($mapCallback));

        return [
            'data' => $paginator->items(),
            'currentPage' => $paginator->currentPage(),
            'lastPage' => $paginator->lastPage(),
            'perPage' => $paginator->perPage(),
            'total' => $paginator->total(),
            'links' => $paginator->links()->elements[0] ?? [],
        ];
    }
}
