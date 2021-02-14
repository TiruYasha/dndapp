using Api.Game.Models;
using GamePart.Api.Models;
using GamePart.Api.Readers;
using GamePart.Domain.CanvasObjects;
using GamePart.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GamePart.Read
{
    public class PlaygroundReader : IPlaygroundReader
    {
        private readonly GameContext _context;

        public PlaygroundReader(GameContext context)
        {
            _context = context;
        }

        public async Task<PlaygroundModel> GetPlaygroundById(Guid playgroundId)
        {
            var playground = await _context.Playgrounds.Include(p => p.Layers).ThenInclude(l => l.CanvasObjects)
                .Where(p => p.Id == playgroundId).FirstOrDefaultAsync();

            var mappedPlayground = new PlaygroundModel
            {
                Id = playground.Id,
                Name = playground.Name,
                Layers = playground.Layers.Select(l => new LayerModel
                {
                    Id = l.Id,
                    Name = l.Name,
                    Order = l.Order,
                    CanvasObjects = l.CanvasObjects.Select(c => MapCanvasObject(c)).ToList()
                }).ToList()
            };

            return mappedPlayground;
        }

        public async Task<List<PlaygroundListItem>> GetPlaygroundsForGame(Guid gameId)
        {
            var playgrounds = await _context.Playgrounds.Where(p => p.GameId == gameId)
                .Select(p => new PlaygroundListItem(p.Id, p.Name, p.IsPlayerView))
                .ToListAsync();

            return playgrounds;
        }

        private CanvasObjectModel MapCanvasObject(CanvasObject c)
        {
            CanvasObjectModel canvasObject;

            canvasObject = MapRectangle(c as Rectangle);

            canvasObject.Id = c.Id;
            canvasObject.X = c.X;
            canvasObject.Y = c.Y;

            return canvasObject;
        }

        private CanvasObjectModel MapRectangle(Rectangle rectangle)
        {
            return new RectangleModel
            {
                Width = rectangle.Width,
                Height = rectangle.Height,
                ColorInHex = rectangle.ColorInHex
            };
        }
    }
}
