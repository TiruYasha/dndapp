using GamePart.Domain;
using GamePart.Domain.CanvasObjects;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GamePart.Repository
{
    public class GameSeeder
    {
        private readonly GameContext _context;

        public GameSeeder(GameContext context)
        {
            _context = context;
        }

        public void SeedDb()
        {
            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();
            if (_context.Games.Count() > 0) return;

            var owner = new Player
            {
                UserId = new Guid("f0a2c7d8-68cf-4c73-bca7-642784531005"),
                IsGameMaster = true

            };

            var player = new Player
            {
                UserId = new Guid("16a29c8f-2952-4b5d-9408-a765b2982239"),
            };

            var game = new Game
            {
                Id = new Guid("9a747b4b-5ce4-428b-8abe-af56ca738c84"),
                Name = "test",
                Players = new List<Player> { owner, player },
            };

            var playground = new Playground
            {
                Id = new Guid("a97fd84a-12a9-4b37-87c3-4c9b72096a1e"),
                Name = "testplayground"
            };

            AddLayer1(playground);
            AddLayer2(playground);

            game.Playgrounds.Add(playground);

            try
            {
                _context.Add(game);
                _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                ;
            }
        }

        private static void AddLayer1(Playground playground)
        {
            var layer1 = new Layer
            {
                Name = "Layer 1",
                Order = 1
            };

            playground.Layers.Add(layer1);

            var rect1 = new Rectangle
            {
                Id = new Guid("2cafabfe-a8a9-4e17-bde3-b9a1a0a4c727"),
                Width = 80,
                Height = 80,
                ColorInHex = 0xFF3300,
                X = 170,
                Y = 170
            };

            var rect2 = new Rectangle
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

        private static void AddLayer2(Playground map)
        {
            var layer2 = new Layer
            {
                Name = "Layer 2",
                Order = 2
            };

            map.Layers.Add(layer2);

            var rect1 = new Rectangle
            {
                Id = new Guid("ae6ea233-b1dd-4def-8bdb-861b4658bc75"),
                Width = 80,
                Height = 80,
                ColorInHex = 0x1c9dff,
                X = 170,
                Y = 170
            };

            var rect2 = new Rectangle
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
