import { Box, Typography, Grid, Chip } from '@mui/material';

export default function ProfileCard() {
  // List of external addresses in the format (name, address)
  const externalAddresses = [
    ['Polygon', '0x12345678'],
    ['Arbitrum', '0x12345678'],
    // Add more addresses here
  ];

  const verificationStatus = "Verification Status"
  const circleAddress = "0000000-000000000-0000000"
  const email = "mario.aa@gmail.com"

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100vw',
        minHeight: '80vw',
        maxHeight: '100vw',
        margin: '0 auto',
        padding: '20px',
        paddingBottom: '500px',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Email */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="subtitle1" color="textSecondary">
            Email
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1" color="primary" align="right">
            {email}
          </Typography>
        </Grid>
      </Grid>

      {/* Circle Address */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={6}>
          <Typography variant="subtitle1" color="textSecondary">
            Circle Address
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1" color="textSecondary" align="right">
            {circleAddress}
          </Typography>
        </Grid>
      </Grid>

      {/* External Addresses */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="textSecondary" sx={{ paddingBottom: '8px' }}>
            External Addresses
          </Typography>
        </Grid>

        {externalAddresses.map(([name, address], index) => (
          <Grid container key={index} spacing={2} sx={{ paddingBottom: '8px', paddingInlineStart: '40px' }}>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="primary">
                {name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="textSecondary" align="right">
                {address}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>

      {/* Verification Status */}
      <Grid container spacing={2} sx={{ marginTop: 3 }} alignItems="center">
        <Grid item xs={6}>
          <Typography
            variant="subtitle1"
            color="primary"
            sx={{ textDecoration: 'underline' }}
          >
            {verificationStatus}
          </Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="flex-end">
          <Chip
            label="Verified"
            color="success"
            sx={{
              borderRadius: '20px',
              fontWeight: 'bold',
              padding: '8px 12px',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
