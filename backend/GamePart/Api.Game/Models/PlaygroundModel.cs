using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Game.Models
{
    public class PlaygroundModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public ICollection<LayerModel> Layers { get; set; }

        public PlaygroundModel()
        {
            Layers = new List<LayerModel>();
        }
    }
}
