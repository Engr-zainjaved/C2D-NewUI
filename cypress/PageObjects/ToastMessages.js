class toastMessages
{
    txt_buildcreate="build is created";
    txt_buildsucceed="build have been succeed";


    buildcreated()
    {
       cy.get("locator").contains(this.txt_buildcreate);
    }
    buildsucceed()
    {

    }
    
}
export default toastMessages;