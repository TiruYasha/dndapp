using GamePart.Api.Readers;
using GamePart.Api.Utilities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace GamePart.Api.Hubs
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public partial class GameHub : Hub
    {
        private readonly IJwtReader _jwtReader;
        private readonly IPlaygroundReader _playgroundReader;


        public GameHub(IJwtReader jwtReader, IPlaygroundReader playgroundReader)
        {
            _jwtReader = jwtReader;
            _playgroundReader = playgroundReader;
        }

        public async override Task OnConnectedAsync()
        {
            var playerDetails = _jwtReader.GetPlayerDetails();

            await Groups.AddToGroupAsync(Context.ConnectionId, playerDetails.GameId.ToString());

            await base.OnConnectedAsync();
        }
    }
}
