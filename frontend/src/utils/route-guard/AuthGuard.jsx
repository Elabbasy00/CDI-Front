import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project import
import useAuth from 'hooks/useAuth';
import { useSelector } from 'react-redux';

// ==============================|| AUTH GUARD ||============================== //

export default function AuthGuard({ children }) {
  const { isAuthenticated, AuthSuccessLoading } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && !AuthSuccessLoading) {
      navigate('login', {
        state: {
          from: location.pathname
        },
        replace: true
      });
    }
  }, [isAuthenticated, AuthSuccessLoading, navigate, location]);

  if (AuthSuccessLoading) return null;
  return children;
}

AuthGuard.propTypes = { children: PropTypes.any };
