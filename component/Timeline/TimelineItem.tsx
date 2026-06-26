'use client'
import { FC } from 'react'
import { AccessTimeIcon } from '../Icon'
import { MenuControl, Action } from './MenuControl'
import { format, parseISO } from 'date-fns'
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined'

export type Plan = {
  datetime: string
  description: string
  id: string
  trip_id: string
  place_name?: string | null
  place_id?: string | null
  latitude?: number | null
  longitude?: number | null
}

export type TimelineItemProps = Plan & {
  onClick?: (action: Action, value: Plan) => void
  readOnly?: boolean
}

export const TimelineItem: FC<TimelineItemProps> = ({
  id,
  datetime,
  description,
  onClick,
  trip_id,
  readOnly,
  place_name,
  place_id,
  latitude,
  longitude,
}) => {
  const time = format(parseISO(datetime), 'HH:mm')
  return (
    <div style={{ display: 'flex', alignItems: 'stretch' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 28,
          paddingTop: 14,
          flexShrink: 0,
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--sun)', flexShrink: 0 }} />
        <div style={{ width: 1.5, flex: 1, minHeight: 20, background: 'var(--border-md)', marginTop: 4 }} />
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            background: '#fff',
            border: '0.5px solid var(--border)',
            borderRadius: 14,
            padding: '10px 12px',
            marginBottom: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 11,
                color: 'var(--ink-3)',
                marginBottom: 3,
              }}
            >
              <AccessTimeIcon sx={{ fontSize: 12, color: 'var(--ink-3)' }} />
              <span>{time}</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{description}</div>
            {place_name && (
              <a
                href={
                  place_id
                    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place_name)}&query_place_id=${place_id}`
                    : latitude && longitude
                      ? `https://www.google.com/maps/?q=${latitude},${longitude}`
                      : `https://www.google.com/maps/search/?q=${encodeURIComponent(place_name)}`
                }
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 11,
                  color: 'var(--sky-dark)',
                  marginTop: 4,
                  overflow: 'hidden',
                  textDecoration: 'none',
                }}
              >
                <RoomOutlinedIcon sx={{ fontSize: 12, color: 'var(--sky-dark)', flexShrink: 0 }} />
                <span
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    textDecoration: 'underline',
                    textUnderlineOffset: 2,
                  }}
                >
                  {place_name}
                </span>
              </a>
            )}
          </div>
          {!readOnly && (
            <MenuControl
              onClick={onClick}
              id={id}
              datetime={datetime}
              description={description}
              trip_id={trip_id}
              place_name={place_name}
              place_id={place_id}
              latitude={latitude}
              longitude={longitude}
            />
          )}
        </div>
      </div>
    </div>
  )
}
