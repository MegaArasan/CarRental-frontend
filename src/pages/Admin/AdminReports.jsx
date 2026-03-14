import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Card, CardContent, Chip, Typography } from '@mui/material';
import { downloadUsersReport, fetchAdminReports } from '../../redux/actions/adminActions';
import './Admin.css';

function AdminReports() {
  const dispatch = useDispatch();
  const { reports, dashboardLoading, error } = useSelector((state) => state.adminReducer);

  useEffect(() => {
    dispatch(fetchAdminReports());
  }, [dispatch]);

  const metrics = reports
    ? [
        ['Users', reports.usersCount],
        ['Cars', reports.carsCount],
        ['Bookings', reports.bookingsCount],
        ['Revenue', reports.totalRevenue],
      ]
    : [];

  const handleDownload = async () => {
    const result = await dispatch(downloadUsersReport('xlsx'));

    if (!result.success) {
      window.alert(result.message);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-shell">
        <section className="admin-hero">
          <div>
            <Typography variant="h4" fontWeight={700}>
              Reports
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8, mt: 1 }}>
              Admin-only operational and business summaries from the backend reports API.
            </Typography>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Chip
              label="Restricted"
              sx={{ alignSelf: 'flex-start', bgcolor: '#fff', color: '#991b1b' }}
            />
            <Button variant="contained" color="inherit" onClick={handleDownload}>
              Download Users XLSX
            </Button>
          </div>
        </section>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {dashboardLoading ? (
          <div className="admin-empty">Loading reports...</div>
        ) : !reports ? (
          <div className="admin-empty">No report data available.</div>
        ) : (
          <div className="admin-grid">
            {metrics.map(([label, value]) => (
              <Card key={label} className="admin-card">
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {label}
                  </Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
                    {label === 'Revenue'
                      ? `₹${Number(value || 0).toLocaleString()}`
                      : String(value ?? 0)}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminReports;
