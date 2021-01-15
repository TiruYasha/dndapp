using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Game.Models
{
    public class LayerModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
        public ICollection<CanvasObjectModel> CanvasObjects { get; set; }

        public LayerModel()
        {
            CanvasObjects = new List<CanvasObjectModel>();
        }
    }
}
