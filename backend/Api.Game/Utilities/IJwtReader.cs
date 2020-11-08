using System;
using System.Collections.Generic;
using System.Text;

namespace GamePart.Api.Utilities
{
    public interface IJwtReader
    {
        Guid GetUserId();
        Guid GetGameId();
        PlayerJwt GetPlayerDetails();
    }
}
