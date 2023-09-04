export default {
  formatDate(dateString: string) {
    try {
      const date = new Date(dateString);
      return Intl.DateTimeFormat("en-US").format(date);
    } catch (error) {
      console.log(`error parsing date: ${dateString}`);
      return "";
    }
  },
};
