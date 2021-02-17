import { TestBed } from '@angular/core/testing';
import { instance, mock, notNull, verify, when } from 'ts-mockito';
import { LayerModel } from '../_models/layer.model';
import { PlaygroundModel } from '../_models/playground.model';
import { LayerMapper } from './layer-mapper';
import { PlaygroundMapper } from './playground-mapper';


describe('PlaygroundMapperService', () => {
  let sut: PlaygroundMapper;
  let mockedLayerMapper: LayerMapper;

  beforeEach(() => {
    mockedLayerMapper = mock(LayerMapper);
    TestBed.configureTestingModule({
      providers: [
        PlaygroundMapper,
        { provide: LayerMapper, useValue: instance(mockedLayerMapper) }
      ]
    });
    sut = TestBed.inject(PlaygroundMapper);
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('should return a playground on mapPlayground', () => {
    const layer = instance(mock(LayerModel));
    const playgroundModel: PlaygroundModel = {
      isPlayerView: true,
      layers: [layer],
      name: 'test'
    };

    const result = sut.MapPlayground(playgroundModel);

    expect(result.width).toEqual(700);
    expect(result.height).toEqual(600);
    expect(result.app.stage.width).toEqual(700);
    expect(result.app.stage.height).toEqual(600);
    verify(mockedLayerMapper.addLayers(notNull(), playgroundModel.layers)).called();
  });
});

