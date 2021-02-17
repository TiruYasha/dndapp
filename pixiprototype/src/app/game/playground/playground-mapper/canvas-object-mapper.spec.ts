import { anything, instance, mock, verify, when } from 'ts-mockito';
import { Rectangle } from '../../pixi/pixi-objects/rectangle.model';
import { Layer } from '../../pixi/pixi-structure/layer.model';
import { CanvasObject } from '../_models/canvas-objects/canvas-object.model';
import { RectangleModel } from '../_models/canvas-objects/rectangle.model';
import { CanvasObjectMapper } from './canvas-object-mapper';
import { PixiObjectMapper } from './pixi-object-mapper';

describe('CanvasObjectMapper', () => {
  let sut: CanvasObjectMapper;
  let mockedPixiObjectMapper: PixiObjectMapper;
  let mockedLayer: Layer;

  beforeEach(() => {
    mockedPixiObjectMapper = mock(PixiObjectMapper);
    mockedLayer = mock(Layer);

    sut = new CanvasObjectMapper(instance(mockedPixiObjectMapper));
  });

  it('should add a rectangle to the layer', () => {
    const layer = instance(mockedLayer);
    const rectangle = instance(mock(Rectangle));
    const canvasObjects: CanvasObject[] = [
      new RectangleModel()
    ];

    when(mockedPixiObjectMapper.mapRectangle(canvasObjects[0] as RectangleModel)).thenReturn(rectangle);

    sut.addCanvasObjectsToLayer(layer, canvasObjects);

    verify(mockedPixiObjectMapper.mapRectangle(canvasObjects[0] as RectangleModel)).called();
    verify(mockedLayer.addObject(rectangle)).called();
  });

  it('should add multiple rectangles to the layer', () => {
    const layer = instance(mockedLayer);
    const rectangle = instance(mock(Rectangle));
    const canvasObjects: CanvasObject[] = [
      new RectangleModel(),
      new RectangleModel(),
    ];

    when(mockedPixiObjectMapper.mapRectangle(anything())).thenReturn(rectangle);

    sut.addCanvasObjectsToLayer(layer, canvasObjects);

    verify(mockedPixiObjectMapper.mapRectangle(anything())).called();
    verify(mockedLayer.addObject(anything())).called();
  });
});
