import { of } from 'rxjs'
import { Observable } from 'rxjs/internal/Observable'

import { ICurrentWeather } from '../interface'
import { IWeatherService } from './weather.service'

export const fakeWeather: ICurrentWeather = {
  city: 'Bethesda',
  state: 'MD',
  country: 'US',
  date: 1485789600,
  image: '',
  temperature: 280.32,
  description: 'light intensity drizzle',
}
export class WeatherServiceFake implements IWeatherService {
  public getCurrentWeather(
    city: string,
    state: string,
    country: string
  ): Observable<ICurrentWeather> {
    return of(fakeWeather)
  }
}
