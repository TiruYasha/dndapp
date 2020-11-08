using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Game.Models
{
    public class RectangleModel : CanvasObjectModel
    {
        public int Height { get; set; }
        public int Width { get; set; }
        public int ColorInHex { get; set; }

        public RectangleModel() : base(CanvasObjectType.Rectangle)
        {
        }
    }
}
