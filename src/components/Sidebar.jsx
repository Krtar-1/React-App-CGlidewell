import { useState, useCallback } from "react"

/**
 * Renders an array of strings passed in that can be filtered and added to as an
 * unordered list.
 * @returns Component
 */
export default function Sidebar({ initialMenuItems = [] }) {
  let [newMenuItem, setNewMenuItem] = useState("")

  // ✅ TODO 2: Maintain current menu items in state
  let [menuItems, setMenuItems] = useState(initialMenuItems)

  let [filter, setFilter] = useState("")

  // ✅ TODO 3: Add new item to menuItems state
  let addMenuItem = useCallback(() => {
    if (!newMenuItem.trim()) return

    setMenuItems((prevItems) => [...prevItems, newMenuItem])
    setNewMenuItem("")
  }, [newMenuItem])

  // ✅ TODO 4: Filter menu items using case-insensitive regex
  let filteredMenuItems = menuItems.filter((item) => {
    if (!filter.trim()) return true

    const escaped = filter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const regex = new RegExp(escaped, "i")
    return regex.test(item)
  })

  return (
    <div>
      <input
        type="text"
        id="newMenuItemValue"
        value={newMenuItem}
        onChange={(event) => setNewMenuItem(event.target.value)}
      />
      <br />

      <button onClick={addMenuItem}>
        Add Item
      </button>

      <br />

      <input
        id="filter"
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        placeholder="Filter by..."
      />

      {/* ✅ TODO 1: Render unordered list */}
      <ul>
        {filteredMenuItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
