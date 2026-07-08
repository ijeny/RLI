import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Trash2,
  Package,
  Building2,
  BookOpen,
  FileText,
  Leaf,
  ChevronDown,
  ChevronRight,
  User,
  Database,
  ShoppingBag,
  PlusCircle,
  ArrowDownCircle,
  ClipboardList,
  Recycle,
  FlaskConical,
  Banknote,
  History,
  GraduationCap,
} from "lucide-react";

interface SubMenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  children?: SubMenuItem[];
}

interface SidebarProps {
  activeMenu: string;
  onMenuClick: (menu: string) => void;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  {
    id: 'manajemen-user',
    label: 'Manajemen User',
    icon: Users,
    children: [
      { id: 'data-user', label: 'Data User', icon: User },
    ],
  },
  {
    id: 'bank-sampah',
    label: 'Bank Sampah',
    icon: Trash2,
    children: [
      { id: 'data-nasabah', label: 'Data Nasabah', icon: Database },
      { id: 'setoran-masuk', label: 'Setoran Masuk', icon: ArrowDownCircle },
      { id: 'draft-setoran', label: 'Draft Setoran', icon: ClipboardList },
      { id: 'pengelolaan-sampah', label: 'Pengelolaan Sampah', icon: Recycle },
      { id: 'pengelolaan-pupuk', label: 'Pengelolaan Pupuk', icon: FlaskConical },
      { id: 'penarikan-uang', label: 'Penarikan Uang', icon: Banknote },
      { id: 'riwayat-penarikan', label: 'Riwayat Penarikan', icon: History },
    ],
  },
  {
    id: 'produk-edu',
    label: 'Produk & Edu Store',
    icon: Package,
    children: [
      { id: 'pengelolaan-produk', label: 'Pengelolaan Produk', icon: ShoppingBag },
      { id: 'tambah-produk', label: 'Tambah Produk', icon: PlusCircle },
      { id: 'pelatihan', label: 'Pelatihan', icon: GraduationCap },
      { id: 'riwayat-pelatihan', label: 'Riwayat Pelatihan', icon: History },
    ],
  },
  { id: 'manajemen-ifk', label: 'Manajemen IFK', icon: Building2 },
  { id: 'kurikulum-hijau', label: 'Kurikulum Hijau', icon: BookOpen },
  { id: 'laporan', label: 'Laporan', icon: FileText },
];

function getParentId(activeMenu: string): string | null {
  for (const item of menuItems) {
    if (item.children?.some((c) => c.id === activeMenu)) {
      return item.id;
    }
  }
  return null;
}

export function Sidebar({ activeMenu, onMenuClick }: SidebarProps) {
  const parentOfActive = getParentId(activeMenu);
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    if (parentOfActive) init[parentOfActive] = true;
    return init;
  });

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleParentClick = (item: MenuItem) => {
    if (item.children) {
      toggleExpand(item.id);
    } else {
      onMenuClick(item.id);
    }
  };

  const isParentActive = (item: MenuItem) =>
    activeMenu === item.id || item.children?.some((c) => c.id === activeMenu);

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg text-sidebar-foreground">RLI</h1>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="px-3 space-y-0.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const hasChildren = !!item.children;
            const isOpen = expanded[item.id];
            const active = isParentActive(item);

            return (
              <div key={item.id}>
                <button
                  onClick={() => handleParentClick(item)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                    ${!hasChildren && activeMenu === item.id
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : hasChildren && active
                      ? 'text-primary bg-primary/10'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="text-sm flex-1 text-left">{item.label}</span>
                  {hasChildren && (
                    isOpen
                      ? <ChevronDown className="w-4 h-4 shrink-0" />
                      : <ChevronRight className="w-4 h-4 shrink-0" />
                  )}
                </button>

                {hasChildren && isOpen && (
                  <div className="mt-0.5 ml-3 pl-4 border-l border-sidebar-border space-y-0.5">
                    {item.children!.map((child) => {
                      const ChildIcon = child.icon;
                      const childActive = activeMenu === child.id;
                      return (
                        <button
                          key={child.id}
                          onClick={() => onMenuClick(child.id)}
                          className={`
                            w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-left
                            ${childActive
                              ? 'bg-primary text-primary-foreground shadow-sm'
                              : 'text-sidebar-foreground hover:bg-sidebar-accent'
                            }
                          `}
                        >
                          <ChildIcon className="w-4 h-4 shrink-0" />
                          <span className="text-sm">{child.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs text-primary">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-sidebar-foreground truncate">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@ecowaste.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
