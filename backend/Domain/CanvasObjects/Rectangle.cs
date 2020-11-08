using System;
using System.Collections.Generic;
using System.Text;

namespace GamePart.Domain.CanvasObjects
{
    public class Rectangle : CanvasObject
    {
        public int Height { get; set; }
        public int Width { get; set; }
        public int ColorInHex { get; set; }

        public Rectangle() : base(CanvasObjectType.Rectangle)
        {
        }
    }
}
