import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Dropdown, DropdownHeader, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { Link, usePage } from '@inertiajs/react';

const ProfileDropdown = () => {
  const { auth } = usePage().props;
  const userName = auth?.user?.name ?? 'Usuario';

  const getInitials = (name = '') => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };
  const initials = getInitials(userName ?? 'U');

  return (
    <div className="topbar-item nav-user">
      <Dropdown align={'end'}>
        <DropdownToggle
          as={'a'}
          className="topbar-link drop-arrow-none px-2"
          data-bs-toggle="dropdown"
          data-bs-offset="0,19"
          type="button"
          aria-haspopup="false"
          aria-expanded="false"
        >
          <div
            className="d-flex justify-content-center align-items-center rounded-circle me-lg-2"
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#4e73df',
              color: 'white',
              fontWeight: '600',
              fontSize: '16px',
            }}
          >
            {initials}
          </div>
          <span className="d-lg-flex flex-column gap-1 d-none">
            <h5 className="my-0">{userName}</h5>
          </span>
          <IconifyIcon icon="tabler:chevron-down" className="d-none d-lg-block align-middle ms-2" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownHeader className="noti-title">
            <h6 className="text-overflow m-0">Bienvenido !</h6>
          </DropdownHeader>
          <DropdownItem>
            <IconifyIcon icon="tabler:user-hexagon" className="me-1 fs-17 align-middle" />
            <span className="align-middle">Mi perfil</span>
          </DropdownItem>
          <DropdownItem>
            <IconifyIcon icon="tabler:settings" className="me-1 fs-17 align-middle" />
            <span className="align-middle">Settings</span>
          </DropdownItem>
          <DropdownItem
            as="a"
            href="mailto:soporteoms@agarcia.com.mx"
            className="d-flex align-items-center"
          >
            <IconifyIcon icon="tabler:lifebuoy" className="me-1 fs-17 align-middle" />
            <span className="align-middle">Soporte</span>
          </DropdownItem>
          <div className="dropdown-divider" />
          <DropdownItem>
            <IconifyIcon icon="tabler:lock-square-rounded" className="me-1 fs-17 align-middle" />
            <span className="align-middle">Lock Screen</span>
          </DropdownItem>
          <DropdownItem
            as={Link}
            href={route('logout')}
            method="post"
            className="fw-semibold text-danger d-flex align-items-center"
          >
            <IconifyIcon icon="tabler:logout" className="me-1 fs-17 align-middle" />
            <span className="align-middle">Salir</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    
  );
};

export default ProfileDropdown;
