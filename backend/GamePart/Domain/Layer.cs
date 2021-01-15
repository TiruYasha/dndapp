using GamePart.Domain.CanvasObjects;
using System;
using System.Collections.Generic;
using System.Text;

namespace GamePart.Domain
{
    public class Layer
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
        public ICollection<CanvasObject> CanvasObjects { get; set; }

        public Layer()
        {
            Id = Guid.NewGuid();
            CanvasObjects = new List<CanvasObject>();
        }
    }
}
