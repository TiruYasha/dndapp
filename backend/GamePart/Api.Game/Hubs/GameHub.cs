using GamePart.Api.Utilities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GamePart.Api.Hubs
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public partial class GameHub : Hub
    {
        private readonly IJwtReader _jwtReader;

        public GameHub(IJwtReader jwtReader)
        {
            _jwtReader = jwtReader;
        }

        public async override Task OnConnectedAsync()
        {
            var playerDetails = _jwtReader.GetPlayerDetails();

            await Groups.AddToGroupAsync(Context.ConnectionId, playerDetails.GameId.ToString());
            
            await base.OnConnectedAsync();
        }
    }
}
