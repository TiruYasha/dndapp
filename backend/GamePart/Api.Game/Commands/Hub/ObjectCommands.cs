using System;

namespace GamePart.Api.Models.HubCommands
{
    public record MoveObject(Guid PlaygroundId, Guid LayerId, Guid ObjectId, int NewX, int NewY);
}
