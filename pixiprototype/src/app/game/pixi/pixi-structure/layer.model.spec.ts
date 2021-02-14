import { Container } from 'pixi.js';
import { instance, mock, verify, when } from 'ts-mockito';
import { Rectangle } from '../pixi-objects/rectangle.model';
import { Layer } from './layer.model';


describe('ObjectService', () => {
    let sut: Layer;
    let mockedRectangle: Rectangle;

    beforeEach(() => {
        sut = new Layer('1', 'test', 1);
        mockedRectangle = mock(Rectangle);
        when(mockedRectangle.displayObject).thenReturn(new Container());
    });

    it('addObject should add pixiobject to container', () => {
        const rectangle = instance(mockedRectangle);

        sut.addObject(rectangle);

        const pixiObjectResult = sut.pixiObjects.filter(p => p === rectangle)[0];
        const containerResult = sut.container.children.filter(p => p === rectangle.displayObject)[0];
        expect(pixiObjectResult).toEqual(rectangle);
        expect(containerResult).toEqual(rectangle.displayObject);
    });

    it('moveObject should move the object with the given id', () => {
        // arrange
        const rectangle = instance(mockedRectangle);
        const newX = 60;
        const newY = 80;
        sut.addObject(rectangle);

        // action
        sut.moveObject(rectangle.id, newX, newY);

        // Assert
        verify(mockedRectangle.move(newX, newY)).called();
    });

    it('moveObject should not move the object if it does not exist', () => {
        // arrange
        const rectangle = instance(mockedRectangle);
        const newX = 60;
        const newY = 80;

        // action
        sut.moveObject(rectangle.id, newX, newY);

        // Assert
        verify(mockedRectangle.move(newX, newY)).never();
    });
});
