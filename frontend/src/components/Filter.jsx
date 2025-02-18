import React, { useState } from 'react';

const Filter = () => {
    const [filter, setFilter] = useState({
        negotiable: null,
        priceRange: [0, 1000], // default price range
        location: '',
        radius: 50, // default radius
      });
    
      const handleLocationChange = (e) => {
        setFilter({ ...filter, location: e.target.value });
      };
  return (
    <div>
        <div className=" bg-white p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Filters</h3>

          {/* Negotiable dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Negotiable</label>
            <select
              value={filter.negotiable}
              onChange={(e) => setFilter({ ...filter, negotiable: e.target.value })}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Location (Google Maps placeholder) */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              value={filter.location}
              onChange={handleLocationChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              placeholder="Enter location or select from map"
            />
            {/* Google Maps placeholder */}
          </div>

          {/* Radius slider */}
          <div className="mb-4 relative group">
  <label className="block text-sm font-medium">Radius <span className='text-gray-500'>(500m to 10000m)</span></label>
  <div className="relative mt-2">
    {/* Slider Input */}
    <input
      type="range"
      min="1"
      max="100"
      value={filter.radius}
      onChange={(e) => setFilter({ ...filter, radius: e.target.value })}
      className="w-full appearance-none bg-gray-300 rounded h-2 focus:outline-none"
    />
    
    {/* Tooltip */}
    <div
      className="absolute -top-8 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
      style={{
        left: `${((filter.radius - 1) / 99) * 100}%`,
      }}
    >
      <span className="bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded shadow-lg">
        {filter.radius * 1000} m
      </span>
    </div>
  </div>
</div>



          {/* Price Range (min and max inputs with currency symbol) */}
          <div className="mb-4 flex space-x-2">
  {/* Min Price Input */}
  <div className="w-1/2">
    <label className="block text-sm font-medium">Min Price</label>
    <div className="flex items-center mt-2 border border-gray-300 rounded-md px-2">
      <span className="text-gray-500">रू.</span>
      <input
        type="number"
        value={filter.priceRange[0]}
        onChange={(e) =>
          setFilter({ ...filter, priceRange: [e.target.value, filter.priceRange[1]] })
        }
        className="w-full pl-2 py-2 outline-none"
        placeholder="Min"
      />
    </div>
  </div>

  {/* Max Price Input */}
  <div className="w-1/2">
    <label className="block text-sm font-medium">Max Price</label>
    <div className="flex items-center mt-2 border border-gray-300 rounded-md px-2">
      <span className="text-gray-500">रू.</span>
      <input
        type="number"
        value={filter.priceRange[1]}
        onChange={(e) =>
          setFilter({ ...filter, priceRange: [filter.priceRange[0], e.target.value] })
        }
        className="w-full pl-2 py-2 outline-none"
        placeholder="Max"
      />
    </div>
  </div>
</div>
          {/* Condition dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Condition</label>
            <select
              onChange={(e) => setFilter({ ...filter, condition: e.target.value })}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select condition</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>
        </div>
    </div>
  )
}

export default Filter