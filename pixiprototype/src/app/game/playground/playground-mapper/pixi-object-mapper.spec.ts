import { CanvasObjectType } from '../../_hubs/models/shared/canvas-objects/canvas-object.type';
import { RectangleModel } from '../../_hubs/models/shared/canvas-objects/rectangle.model';
import { PixiObjectMapper } from './pixi-object-mapper';

describe('PixiObjectMapper', () => {
  let sut: PixiObjectMapper;

  beforeEach(() => {
    sut = new PixiObjectMapper();
  });

  it('should map rectanglemodel to pixirectangle', () => {
    const rectangleModel: RectangleModel = {
      id: 'df',
      colorInHex: 0x00000,
      height: 40,
      width: 60,
      x: 20,
      y: 30,
      type: CanvasObjectType.Rectangle
    };

    const result = sut.mapRectangle(rectangleModel);

    expect(result.id).toEqual(rectangleModel.id);
    expect(result.rectangle.fill.color).toEqual(16777215);
    expect(result.rectangle.height).toEqual(rectangleModel.height);
    expect(result.rectangle.width).toEqual(rectangleModel.width);
    expect(result.rectangle.x).toEqual(rectangleModel.x);
    expect(result.rectangle.y).toEqual(rectangleModel.y);
  });
});
