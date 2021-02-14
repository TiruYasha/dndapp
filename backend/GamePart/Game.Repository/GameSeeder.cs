using GamePart.Domain;
using GamePart.Domain.CanvasObjects;
using System;
using System.Collections.Generic;
using System.Linq;

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
                Id = Guid.NewGuid(),
                Name = "playground",
                IsPlayerView = true
            };

            var playground2 = new Playground
            {
                Id = Guid.NewGuid(),
                Name = "playground 2"
            };

            AddLayer1(playground);
            AddLayer2(playground);

            AddLayer1(playground2);
            AddLayer2(playground2);

            game.Playgrounds.Add(playground);
            game.Playgrounds.Add(playground2);

            _context.Add(game);
            _context.SaveChangesAsync();
        }

        private static void AddLayer1(Playground playground)
        {
            Random rnd = new Random();
            var layer1 = new Layer
            {
                Name = "Layer 1",
                Order = 1
            };

            playground.Layers.Add(layer1);

            var rect1 = new Rectangle
            {
                Id = Guid.NewGuid(),
                Width = 80,
                Height = 80,
                ColorInHex = 0xFF3300,
                X = rnd.Next(1, 500),
                Y = rnd.Next(1, 500)
            };

            var rect2 = new Rectangle
            {
                Id = Guid.NewGuid(),
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
            Random rnd = new Random();
            var layer2 = new Layer
            {
                Name = "Layer 2",
                Order = 2
            };

            map.Layers.Add(layer2);

            var rect1 = new Rectangle
            {
                Id = Guid.NewGuid(),
                Width = 80,
                Height = 80,
                ColorInHex = 0x1c9dff,
                X = rnd.Next(1, 500),
                Y = rnd.Next(1, 500)
            };

            var rect2 = new Rectangle
            {
                Id = Guid.NewGuid(),
                Width = 80,
                Height = 80,
                ColorInHex = 0x1c9dff,
                X = rnd.Next(1, 500),
                Y = rnd.Next(1, 500)
            };

            layer2.CanvasObjects.Add(rect1);
            layer2.CanvasObjects.Add(rect2);
        }
    }
}
