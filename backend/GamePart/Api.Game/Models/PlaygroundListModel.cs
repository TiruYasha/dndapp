using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GamePart.Api.Models
{
    public record PlaygroundListItem(Guid Id, string Name, bool IsPlayerView);
}
