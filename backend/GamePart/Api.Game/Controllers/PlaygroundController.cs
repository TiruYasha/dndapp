using Api.Game.Models;
using GamePart.Api.Readers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GamePart.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlaygroundController : ControllerBase
    {
        private readonly IPlaygroundReader _playgroundReader;

        public PlaygroundController(IPlaygroundReader playgroundReader)
        {
            _playgroundReader = playgroundReader;
        }

        [HttpGet]
        public async Task<ActionResult<PlaygroundModel>> Get()
        {
            var playground = await _playgroundReader.GetPlaygroundById(new Guid("a97fd84a-12a9-4b37-87c3-4c9b72096a1e"));

            //var map = new PlaygroundModel();
            //AddLayer1(map);
            //AddLayer2(map);

            return Ok(playground);
        }

        private static void AddLayer1(PlaygroundModel map)
        {
            var layer1 = new LayerModel
            {
                Name = "Layer 1",
                Order = 1
            };

            map.Layers.Add(layer1);

            var rect1 = new RectangleModel
            {
                Id = new Guid("2cafabfe-a8a9-4e17-bde3-b9a1a0a4c727"),
                Width = 80,
                Height = 80,
                ColorInHex = 0xFF3300,
                X = 170,
                Y = 170
            };

            var rect2 = new RectangleModel
            {
                Id = new Guid("76136cdd-88bc-4aec-97dd-8fc650e58095"),
                Width = 80,
                Height = 80,
                ColorInHex = 0xFF3300,
                X = 270,
                Y = 370
            };

            layer1.CanvasObjects.Add(rect1);
            layer1.CanvasObjects.Add(rect2);
        }

        private static void AddLayer2(PlaygroundModel map)
        {
            var layer2 = new LayerModel
            {
                Name = "Layer 2",
                Order = 2
            };

            map.Layers.Add(layer2);

            var rect1 = new RectangleModel
            {
                Id = new Guid("ae6ea233-b1dd-4def-8bdb-861b4658bc75"),
                Width = 80,
                Height = 80,
                ColorInHex = 0x1c9dff,
                X = 170,
                Y = 170
            };

            var rect2 = new RectangleModel
            {
                Id = new Guid("efb9de7c-864a-4d87-a72e-a999ac84d29d"),
                Width = 80,
                Height = 80,
                ColorInHex = 0x1c9dff,
                X = 270,
                Y = 370
            };

            layer2.CanvasObjects.Add(rect1);
            layer2.CanvasObjects.Add(rect2);
        }
    }
}
