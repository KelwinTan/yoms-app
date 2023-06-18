export function ConvertJobTypeToNum(jobType: string | undefined): number {
  switch (jobType) {
    case "Full-Time":
      return 1;
    case "Part-Time":
      return 2;
    case "Contractor":
      return 3;
    case "Internship":
      return 4;
    case undefined:
    default:
      return 0;
  }
}

export function ConvertPrimaryTagToNum(primaryTag: string | undefined): number {
  switch (primaryTag) {
    case "Backend":
      return 1;
    case "Frontend":
      return 2;
    case "Mobile":
      return 3;
    case "IOS":
      return 4;
    case "DevOps":
      return 5;
    case undefined:
    default:
      return 0;
  }
}

export function ConvertPrimaryTagNumToString(primaryTagNum: number): string {
  switch (primaryTagNum) {
    case 1:
      return "Backend";
    case 2:
      return "Frontend";
    case 3:
      return "Mobile";
    case 4:
      return "IOS";
    case 5:
      return "DevOps";
    default:
      return "";
  }
}
