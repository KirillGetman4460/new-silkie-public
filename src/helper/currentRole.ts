const currentRole = (role: string): string | null => {
    switch (role) {
      case 'user':
        return 'Користувач';
      case 'super_admin':
          return 'Власник';
      default:
        return null;
    }
};

export default currentRole