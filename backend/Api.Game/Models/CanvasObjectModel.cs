using GamePart.Api.JsonConverters;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Api.Game.Models
{
    [JsonConverter(typeof(CanvasObjectConverter))]
    public class CanvasObjectModel
    {
        public Guid Id { get; set; }
        public CanvasObjectType Type { get; set; }
        public double X { get; set; }
        public double Y { get; set; }

        public CanvasObjectModel(CanvasObjectType type)
        {
            Type = type;
        }
    }
}
