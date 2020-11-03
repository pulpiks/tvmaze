import { forward, createEvent } from 'effector'
import { servicesAPI } from '@/api/services'
import { fetchShowsFx, $shows } from './index'

fetchShowsFx.use(async () => servicesAPI.getShows)

$shows.on(fetchShowsFx.done, (_, response) => response.result as any)
