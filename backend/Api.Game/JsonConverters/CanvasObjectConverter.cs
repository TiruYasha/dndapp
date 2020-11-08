using Api.Game.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace GamePart.Api.JsonConverters
{
    public class CanvasObjectConverter : JsonCreationConverter<CanvasObjectModel>
    {
        protected override CanvasObjectModel Create(Type objectType, JObject jObject)
        {
            if (jObject == null) throw new ArgumentNullException("jObject");
            var typeNumber = jObject.Value<int>("type");
            var canvasObjectType = (CanvasObjectType)typeNumber;

            if (canvasObjectType == CanvasObjectType.Rectangle)
            {
                return new RectangleModel();
            }


            return new RectangleModel();
        }
    }
}
