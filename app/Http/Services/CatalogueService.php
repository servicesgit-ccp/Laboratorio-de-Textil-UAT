<?php

namespace App\Http\Services;

use App\Models\Sku;
use App\Models\Division;
use App\Models\Department;
use App\Models\Provider;
use App\Models\Style;

class CatalogueService
{
    // ======================
    // SKUS
    // ======================

    public function findSkuByNumber(string $number)
    {
        return Sku::where('NUMBER', $number)->with('style')->first();
    }

    // ======================
    // STYLES
    // ======================

    public function findStyleByNumber(string $number): ?Style
    {
        return Style::where('NUMBER', $number)->first();
    }

    // ======================
    // DIVISIONS
    // ======================

    public function allDivisions()
    {
        return Division::orderBy('NAME')->get(['ID', 'CODE', 'NAME']);
    }

    public function findDivisionByCode(string $code): ?Division
    {
        return Division::where('CODE', $code)->first();
    }

    // ======================
    // DEPARTMENTS
    // ======================

    public function allDepartments()
    {
        return Department::orderBy('NAME')->get(['ID', 'CODE', 'NAME', 'DIVISION_ID']);
    }

    public function findDepartmentByCode(string $code): ?Department
    {
        return Department::where('CODE', $code)->first();
    }

    // ======================
    // PROVIDERS
    // ======================

    public function allProviders()
    {
        return Provider::orderBy('NAME')->get(['ID', 'CODE', 'NAME']);
    }

    public function findProviderByCode(string $code): ?Provider
    {
        return Provider::where('CODE', $code)->first();
    }
}
