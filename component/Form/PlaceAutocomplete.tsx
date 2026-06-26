'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { setOptions, importLibrary } from '@googlemaps/js-api-loader'
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined'
import ClearIcon from '@mui/icons-material/Clear'
import { logError } from '@/utils/logger'

export interface PlaceData {
  name: string
  placeId: string
  lat: number
  lng: number
}

interface Props {
  value?: PlaceData | null
  onChange?: (place: PlaceData | null) => void
  placeholder?: string
}

let mapsLoadingPromise: Promise<void> | null = null

const ensureMapsLoaded = () => {
  if (mapsLoadingPromise) return mapsLoadingPromise
  setOptions({
    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
    language: 'ja',
  })
  mapsLoadingPromise = importLibrary('places')
    .then(() => {})
    .catch((err: unknown) => {
      mapsLoadingPromise = null
      throw err
    })
  return mapsLoadingPromise
}

export const PlaceAutocomplete = ({ value, onChange, placeholder = '場所を追加' }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompleteSuggestion[]>([])
  const [isApiLoaded, setIsApiLoaded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    ensureMapsLoaded()
      .then(() => setIsApiLoaded(true))
      .catch((err: unknown) => {
        logError('Failed to load Google Maps', {
          message: err instanceof Error ? err.message : String(err),
        })
      })
  }, [])

  useEffect(() => {
    if (isEditing) inputRef.current?.focus()
  }, [isEditing])

  const handleSearch = useCallback(
    (query: string) => {
      setInputValue(query)
      if (debounceRef.current) clearTimeout(debounceRef.current)

      if (!query || !isApiLoaded) {
        setSuggestions([])
        return
      }

      debounceRef.current = setTimeout(async () => {
        try {
          const { suggestions: results } = await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
            {
              input: query,
              language: 'ja',
            }
          )
          setSuggestions(results.slice(0, 5))
        } catch {
          setSuggestions([])
        }
      }, 300)
    },
    [isApiLoaded]
  )

  const handleSelect = useCallback(
    async (suggestion: google.maps.places.AutocompleteSuggestion) => {
      const prediction = suggestion.placePrediction
      if (!prediction) return

      setIsEditing(false)
      setSuggestions([])
      setInputValue('')

      try {
        const place = prediction.toPlace()
        await place.fetchFields({ fields: ['location', 'displayName'] })
        onChange?.({
          name: prediction.text.text,
          placeId: prediction.placeId,
          lat: place.location?.lat() ?? 0,
          lng: place.location?.lng() ?? 0,
        })
      } catch {
        onChange?.({
          name: prediction.text.text,
          placeId: prediction.placeId,
          lat: 0,
          lng: 0,
        })
      }
    },
    [onChange]
  )

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange?.(null)
  }

  const handleBlur = () => {
    setTimeout(() => {
      setIsEditing(false)
      setSuggestions([])
      setInputValue('')
    }, 150)
  }

  const borderStyle = isEditing
    ? '1.5px solid var(--sun)'
    : value
      ? '0.5px solid var(--sky-mid)'
      : '0.5px solid rgba(28,25,23,0.14)'

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          if (!value) setIsEditing(true)
        }}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !value) setIsEditing(true)
        }}
        style={{
          width: '100%',
          height: 48,
          background: 'var(--sand)',
          border: borderStyle,
          borderRadius: 14,
          padding: '0 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          cursor: isEditing ? 'text' : 'pointer',
          transition: 'border-color 0.15s',
        }}
        aria-label="場所を選択"
      >
        <RoomOutlinedIcon
          sx={{ fontSize: 16, color: isEditing || value ? 'var(--sky-dark)' : 'var(--ink-3)', flexShrink: 0 }}
        />
        {isEditing ? (
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => handleSearch(e.target.value)}
            onBlur={handleBlur}
            placeholder={placeholder}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: 14,
              color: 'var(--ink)',
              fontFamily: 'inherit',
              padding: 0,
            }}
          />
        ) : (
          <span
            style={{
              flex: 1,
              fontSize: 14,
              color: value ? 'var(--ink)' : 'var(--ink-3)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {value ? value.name : placeholder}
          </span>
        )}
        {value && !isEditing && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="場所をクリア"
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: 'rgba(28,25,23,0.14)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              padding: 0,
            }}
          >
            <ClearIcon sx={{ fontSize: 11, color: 'var(--ink-2)' }} />
          </button>
        )}
      </div>

      {isEditing && suggestions.length > 0 && (
        <ul
          role="listbox"
          aria-label="場所の候補"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#fff',
            border: '0.5px solid rgba(28,25,23,0.14)',
            borderRadius: 14,
            marginTop: 4,
            overflow: 'hidden',
            zIndex: 200,
            boxShadow: '0 4px 16px rgba(28,25,23,0.1)',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {suggestions.map((s, i) => {
            const prediction = s.placePrediction
            if (!prediction) return null
            return (
              <li
                key={prediction.placeId}
                role="option"
                aria-selected={false}
                onMouseDown={() => handleSelect(s)}
                style={{
                  padding: '10px 14px',
                  borderTop: i > 0 ? '0.5px solid rgba(28,25,23,0.09)' : 'none',
                  cursor: 'pointer',
                  fontSize: 13,
                  color: '#1c1917',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <RoomOutlinedIcon sx={{ fontSize: 14, color: '#a8a29e', flexShrink: 0 }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {prediction.text.text}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
