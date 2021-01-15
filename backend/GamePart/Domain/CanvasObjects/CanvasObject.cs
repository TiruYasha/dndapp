using System;

namespace GamePart.Domain.CanvasObjects
{
    public abstract class CanvasObject
    {
        public Guid Id { get; set; }
        public CanvasObjectType Type { get; set; }
        public double X { get; set; }
        public double Y { get; set; }

        public CanvasObject(CanvasObjectType type)
        {
            Id = Guid.NewGuid();
            Type = type;
        }
    }
}
