<?php

namespace App\Http\Services;

use App\Models\Provider;
use Illuminate\Support\Facades\DB;

class ProviderService
{
    protected $mProvider;

    public function __construct()
    {
        $this->mProvider = new Provider();
    }

    public function getProviders(int $perPage = 10, ?string $search = null)
    {
        $q = $this->mProvider->query();
        if ($search) {
            $q->where(function ($qq) use ($search) {
                $qq->where('name', 'like', "%{$search}%")
                    ->orWhere('number', 'like', "%{$search}%");
            });
        }
        return $q->orderBy('name')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function createProvider(array $data)
    {
        $provider = $this->mProvider->create([
            'name' => $data['name'],
            'number' => $data['number'],
            'designation' => $data['designation']
        ]);

        return $provider;
    }

    public function updateProvider(Provider $provider, array $data): Provider
    {
        return DB::transaction(function () use ($provider, $data) {
            $payload = [
                'name'  => $data['name'],
                'number' => $data['number'],
                'designation' => $data['designation'],
            ];
            $provider->update($payload);
            return $provider->refresh();
        });
    }

    public function softDeleteProvider(Provider $provider): void
    {
        DB::transaction(function () use ($provider) {
            $provider->delete();
        });
    }
}
