import Dialog from '@mui/material/Dialog';

function ShowImageDialog({ open, setOpen, image }: { open: boolean; setOpen: (item: boolean) => void; image: any }) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      {/* <DialogTitle>
        Image
        <IconButton
          aria-label='close'
          onClick={() => setOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500]
          }}
        >
          <Icon icon='mdi:close' fontSize='1.6rem' />
        </IconButton>
      </DialogTitle> */}
      {/* <DialogContent> */}
      {image && (
        <img
          style={{
            width: '100%',
            maxHeight: '500px'
          }}
          src={image}
          alt="Selected Image"
        />
      )}
      {/* </DialogContent> */}
    </Dialog>
  );
}

export default ShowImageDialog;
