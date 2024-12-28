import { MenusPayload } from "@@/app/api/data/menus/route";
import { IconsCollection } from "@@/src/constant/icons";

export const sqlMenuItems = `
  CREATE TABLE IF NOT EXISTS menus (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    url TEXT,
    icon TEXT,
    flag TEXT,
    parent_id INTEGER,
    pages_id INTEGER,
    order_position INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES menus(id),
    FOREIGN KEY (pages_id) REFERENCES pages(id)
  );
  CREATE INDEX IF NOT EXISTS idx_menu_hierarchy ON menus(parent_id, order_position);
  CREATE INDEX IF NOT EXISTS idx_menu_parent ON menus(parent_id);
  CREATE UNIQUE INDEX IF NOT EXISTS idx_menu_order ON menus(parent_id, order_position);
  
`;

export const menuItemsData: MenusPayload[] = [
  {
    title: "Dashboard",
    url: "/admin/",
    parent_id: null,
    order_position: 1,
    pages_id: 1,
    icon: IconsCollection.home,
    flag: 'Menus'
  },
  {
    title: "Menus",
    url: "/admin/menus",
    parent_id: null,
    order_position: 2,
    pages_id: 2,
    icon: IconsCollection.menus,
    flag: 'Menus'
  },
  {
    title: "Pages",
    url: "/admin/pages",
    parent_id: null,
    order_position: 3,
    pages_id: 3,
    icon: IconsCollection.pages,
    flag: "Menus"
  },
  {
    title: "Armada",
    url: "/admin/armada",
    parent_id: null,
    order_position: 4,
    pages_id: 4,
    icon: IconsCollection.armada,
    flag: "Menus"
  },
  {
    title: "Partner",
    url: "/admin/partner",
    parent_id: null,
    order_position: 5,
    pages_id: 5,
    icon: IconsCollection.partner,
    flag: "Menus"
  },
  {
    title: "Unit",
    url: "/admin/unit",
    parent_id: null,
    order_position: 6,
    pages_id: 6,
    icon: IconsCollection.unit,
    flag: "Menus"
  },
  {
    title: "Category",
    url: "/admin/category",
    parent_id: null,
    order_position: 7,
    pages_id: 7,
    icon: IconsCollection.category,
    flag: "Menus"
  },
  {
    title: "Usage Price",
    url: "/admin/usage-price",
    parent_id: null,
    order_position: 8,
    pages_id: 8,
    icon: IconsCollection.promo,
    flag: "Menus"
  },
  {
    title: 'Renter OnBoarding',
    url: '/renter',
    parent_id: null,
    order_position: 9,
    pages_id: 9,
    icon: IconsCollection.rent,
    flag: 'Menus'
  },
  {
    title: 'Order History',
    url: '/renter/order',
    parent_id: null,
    order_position: 10,
    pages_id: 10,
    icon: IconsCollection.payment,
    flag: 'Menus'
  }
];