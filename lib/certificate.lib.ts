import fs from "fs-extra";
import hbs from "handlebars";
import path from "path";
import puppeteer from "puppeteer";

export const compile_hbs_template = async ({
  template_name,
  data,
}: {
  template_name: string;
  data: any;
}) => {
  const template_path = path.join(
    path.resolve(),
    "views",
    `${template_name}.hbs`
  );

  const html = await fs.readFile(template_path, "utf-8");

  return hbs.compile(html)(data);
};

export const generate_certificate = async ({
  course_title,
  issue_date,
  issued_by,
  student_name,
  document_id,
}: {
  course_title: string;
  issue_date: string;
  issued_by: string;
  student_name: string;
  document_id: string;
}): Promise<string> => {
  try {
    // Generate certificate logic here
    const project_root_path = path.resolve();

    const browser = await puppeteer.connect({ browserWSEndpoint: process.env.BROWSER_WS_ENDPOINT });
    const page = await browser.newPage();

    // setting content
    // get the image as base64
    const sample = fs.readFileSync(
      path.join(project_root_path, "public/sample.png")
    );

    const sample_base64 = Buffer.from(sample).toString("base64");

    const content = await compile_hbs_template({
      template_name: "certificate",
      data: {
        course_title,
        issue_date,
        issued_by,
        student_name,
        img_src: `data:image/png;base64,${sample_base64}`,
      },
    });
    await page.setContent(content);
    page.addStyleTag({ content: "@page {size: auto}" });

    // create pdf document
    const file_path = path.join(
      project_root_path,
      "public/certificates",
      `certificate-${document_id}-${new Date().getTime()}.pdf`
    );

    await page.pdf({
      path: file_path,
      format: "A4",
      printBackground: true,
      landscape: true,
    });

    await browser.close();

    return file_path;
  } catch (err) {
    throw err;
  }
};
