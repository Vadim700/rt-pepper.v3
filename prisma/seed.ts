async function up() {}
async function down() {}
async function main() {
  try {
    await up();
    await down();
  } catch (e) {
    console.error(e);
  }
}
