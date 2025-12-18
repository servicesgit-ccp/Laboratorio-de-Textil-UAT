<?php

namespace App\Events;

use App\Models\TestRequest;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TestRequestAssigned implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public TestRequest $test,
        public string $message,
        public ?int $userId = null,
    ) {}

    public function broadcastOn(): array
    {
        $channels = [new Channel('public-channel')];

        if ($this->userId) {
            $channels[] = new PrivateChannel("test-requests.{$this->userId}");
        }

        return $channels;
    }

    public function broadcastWith(): array
    {
        return [
            'test_request_id' => $this->test->id,
            'reference' => $this->test->number,
            'assigned_to' => optional($this->test->technician)->name,
            'summary' => $this->message,
        ];
    }
}
