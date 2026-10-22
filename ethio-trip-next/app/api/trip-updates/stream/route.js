
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const encoder = new TextEncoder();

  const updates = [
    "Your trip request is being prepared.",
    "Your itinerary is ready for review.",
    "Your trip is awaiting guide confirmation.",
    "Your trip status is still pending.",
  ];

  let index = 0;
  let interval;

  const stream = new ReadableStream({
    start(controller) {
      const sendUpdate = () => {
        try {
          const update = {
            id: index + 1,
            message: updates[index % updates.length],
            timestamp: new Date().toISOString(),
            demo: true,
          };

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(update)}\n\n`)
          );

          index += 1;
        } catch {
          clearInterval(interval);
        }
      };

      sendUpdate();
      interval = setInterval(sendUpdate, 5000);
    },

    cancel() {
      clearInterval(interval);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
