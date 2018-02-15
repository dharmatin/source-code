import common from '../../config/common';

class Utility {
  toISOFormatting(strDate) {
    const dateFormatted = new Date(strDate);
    return dateFormatted.toISOString();
  }

  slugify(strUrl) {
    return strUrl
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  getPDPLink() {
    // newlaunchUrl
    // https://newlaunch.rumah123.com/properti/bekasi/teras-alun-alun-vida-bekasi/1492
  }
}

export default new Utility();
