import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'

import { ICurrentWeather } from '../interface'

export interface IWeatherService {
  getCurrentWeather(
    city: string,
    state: string,
    country: string
  ): Observable<ICurrentWeather>
}
interface ICurrentWeatherData {
  weather: [
    {
      description: string
      icon: string
    }
  ]
  main: {
    temp: number
    pressure: number
    humidity: number
  }
  sys: {
    country: string
  }
  dt: number
  name: string
}
@Injectable({
  providedIn: 'root',
})
export class WeatherService implements IWeatherService {
  private state: string
  constructor(private httpClient: HttpClient) {}
  getCurrentWeather(
    city: string,
    state: string,
    country: string
  ): Observable<ICurrentWeather> {
    this.state = state
    const uriParams = new HttpParams()
      .set('q', `${city}, ${state}, ${country}`)
      .set('appid', environment.appId)
    return this.httpClient
      .get<ICurrentWeatherData>(
        `${environment.baseUrl}api.openweathermap.org/data/2.5/weather`,
        { params: uriParams }
      )
      .pipe(map((data) => this.transformToICurrentWeather(data)))
  }

  transformToICurrentWeather(data: ICurrentWeatherData): ICurrentWeather {
    return {
      city: data.name,
      state: this.state,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToFahrenheit(data.main.temp),
      description: data.weather[0].description,
    }
  }

  private convertKelvinToFahrenheit(kelvin: number): number {
    return (kelvin * 9) / 5 - 459.67
  }
}
