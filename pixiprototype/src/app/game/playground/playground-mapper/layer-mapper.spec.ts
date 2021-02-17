import { anyOfClass, anything, deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { Layer } from '../../pixi/pixi-structure/layer.model';
import { Playground } from '../../pixi/pixi-structure/playground.model';
import { LayerModel } from '../_models/layer.model';
import { LayerMapper } from './layer-mapper';
import { CanvasObjectMapper } from './canvas-object-mapper';

describe('LayerMapper', () => {
  let sut: LayerMapper;
  let mockedPixiObjectMapper: CanvasObjectMapper;
  let mockedPlayground: Playground;

  beforeEach(() => {
    mockedPixiObjectMapper = mock(CanvasObjectMapper);
    mockedPlayground = mock(Playground);

    sut = new LayerMapper(instance(mockedPixiObjectMapper));
  });

  it('should add 1 layer with canvasobjects to the playground', () => {
    const playground = instance(mockedPlayground);
    const layers: LayerModel[] = [
      {
        id: 'sdfds',
        name: 'sds',
        order: 2,
        canvasObjects: []
      }
    ];
    const layer = new Layer(layers[0].id, layers[0].name, layers[0].order);

    sut.addLayers(playground, layers);

    verify(mockedPlayground.addLayer(deepEqual(layer))).called();
    verify(mockedPixiObjectMapper.addCanvasObjectsToLayer(deepEqual(layer), layers[0].canvasObjects)).called();
  });

  it('should add multiple layers with canvasobjects to the playground', () => {
    const playground = instance(mockedPlayground);
    const layers: LayerModel[] = [
      {
        id: 'sdfds',
        name: 'sds',
        order: 2,
        canvasObjects: []
      },
      {
        id: 'sdfdsss',
        name: 'sdsdd',
        order: 4,
        canvasObjects: []
      }
    ];

    sut.addLayers(playground, layers);

    verify(mockedPlayground.addLayer(anything())).twice();
    verify(mockedPixiObjectMapper.addCanvasObjectsToLayer(anything(), anything())).twice();
  });
});
