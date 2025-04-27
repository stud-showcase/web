<?php

namespace App\Dto;

class VacancyDto
{
    public function __construct(
        public int $id,
        public string $name,
        public ?string $description
    ) {}

    public static function fromModel($vacancy): self
    {
        return new self(
            id: $vacancy->id,
            name: $vacancy->name,
            description: $vacancy->description
        );
    }

    public function toArray(): array
    {
        return get_object_vars($this);
    }
}
