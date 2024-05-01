
import { LogEntity } from '../../entities/log.entity';
import { CheckServiceMultiple } from './check-service-multiple';



describe( 'CheckService multiple UseCase', () => {

  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockRepository_1 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockRepository_2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const successCallback = jest.fn();
  const errorCallback = jest.fn();



  const checkServiceMultiple= new CheckServiceMultiple(
    [mockRepository, mockRepository_1, mockRepository_2 ],
    successCallback,
    errorCallback,
  );

  beforeEach(() =>{
    jest.clearAllMocks();
  })



  test( 'should call successCallback when fetch returns true', async () => {

    const wasOk = await checkServiceMultiple.execute( 'https://google.com' );
    
    expect( wasOk ).toBe( true );
    expect( successCallback ).toHaveBeenCalled()
    expect( errorCallback ).not.toHaveBeenCalled();

    expect( mockRepository.saveLog ).toBeCalledWith(expect.any( LogEntity ));
    expect( mockRepository_1.saveLog ).toBeCalledWith(expect.any( LogEntity ));
    expect( mockRepository_2.saveLog ).toBeCalledWith(expect.any( LogEntity ));



  } );

  test( 'should call errorCallback when fetch returns false', async () => {

    const wasOk = await checkServiceMultiple.execute( 'https://goasdfasdfasdfasdogle.com' );
    
    expect( wasOk ).toBe( false );
    expect( successCallback ).not.toHaveBeenCalled()
    expect( errorCallback ).toHaveBeenCalled();

    expect( mockRepository.saveLog ).toBeCalledWith(expect.any( LogEntity ));
    expect( mockRepository_1.saveLog ).toBeCalledWith(expect.any( LogEntity ));
    expect( mockRepository_2.saveLog ).toBeCalledWith(expect.any( LogEntity ));

  } );




} );