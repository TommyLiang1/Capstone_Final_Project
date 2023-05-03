import React from "react";
import Layout from "./Layout";
import "../styles/Contact.css";

const Contact = () => {
    return (
        <Layout>
            <div className="contact-container">
                <p><b>If you are in immediate danger, please call 911.</b></p>
                <p>Hotlines provide help, support, information, and referrals. Most hotlines offer free 24-hour assistance and, in some cases, provide over-the-phone crisis counseling.</p>
                <p><b>Local/City Hotlines</b>: For support, information, and resources available near you, you may call one of the city hotlines listed below.</p>

                <table className="rt">
                    <tbody>
                        <tr>
                            <th>Individuals Needing Assistance</th> <th>Hotline Number</th>
                        </tr>
                        <tr>
                            <td data-label="Individuals Needing Assistance"><a href="http://www.safehorizon.org/page/call-our-hotlines-9.html" >Victims of Crime and their Families (Safe Horizon)</a></td>
                            <td data-label="Hotline Number">866-689-HELP (4357)<br></br> TDD: 866-604-5350<br></br> * Assistance available in multiple languages</td>
                        </tr>
                        <tr>
                            <td data-label="Individuals Needing Assistance"><a href="https://www.safehorizon.org/get-help/domestic-violence/#overview/" >Domestic Violence Victims (Safe Horizon)</a></td>
                            <td data-label="Hotline Number">800-621-HOPE (4673)<br></br> TDD: 866-604-5350<br></br> * Assistance available in multiple languages</td>
                        </tr>
                        <tr>
                            <td data-label="Individuals Needing Assistance"><a href="http://www.safehorizon.org/page/rape-and-sexual-assault-13.html" >Rape and Sexual Assault Victims (Safe Horizon)</a></td>
                            <td data-label="Hotline Number">212-227-3000<br></br> TDD: 866-604-5350<br></br> *Assistance available in multiple languages</td>
                        </tr>
                        <tr>
                            <td data-label="Individuals Needing Assistance"><a href="http://www.safehorizon.org/page/homeless-youth-15.html" >Homeless Youth and Teen Victims (Safe Horizon)</a></td>
                            <td data-label="Hotline Number">800-708-6600<br></br> * Assistance available in multiple languages</td>
                        </tr>
                        <tr>
                            <td data-label="Individuals Needing Assistance"><a href="http://www.nyc.gov/html/dfta/html/services/crime-victims.shtml">Elderly Crime Victims (NYC Department for the Aging Resource Center)</a></td>
                            <td data-label="Hotline Number">866-689-HELP (4357) or 212-442-3103<br></br> 9 AM - 5 PM only</td>
                        </tr>
                        <tr>
                            <td data-label="Individuals Needing Assistance"><a href="http://www1.nyc.gov/site/acs/child-welfare/how-to-make-report.page">Child Abuse and Neglect Report Line (Administration for Children's Services)</a></td>
                            <td data-label="Hotline Number">800-342-3720 or 311</td>
                        </tr>
                        <tr>
                            <td data-label="Individuals Needing Assistance"><a href="http://www1.nyc.gov/site/doh/health/health-topics/nyc-well.page">People affected with Mental Health and/or Substance Abuse Problems (NYC Well)</a></td>
                            <td data-label="Hotline Number">888-NYC-WELL (888-692-9355)<br></br> Spanish: 888-692-9355<br></br> Korean, Mandarin, and Cantonese: 888-692-9355 <br></br> TTY for hearing impaired: 711</td>
                        </tr>
                        <tr>
                            <td data-label="Individuals Needing Assistance"><a href="http://www.justicecenter.ny.gov/investigations-prosecution/vpcr/faq" >People with Disabilities (Vulnerable Persons Central Register)</a></td>
                            <td data-label="Hotline Number">855-373-2122<br></br> TTY: 1-855-373-2123<br></br> * Assistance available in multiple languages</td>
                        </tr>
                        <tr>
                            <td data-label="Individuals Needing Assistance"><a href="http://www.bflnyc.org" >People with Disabilities (Barrier Free Living)</a></td>
                            <td data-label="Hotline Number">212-533-4358<br></br> 9 AM - 5 PM only</td>
                        </tr>
                        <tr>
                            <td data-label="Individuals Needing Assistance"><a href="http://www1.nyc.gov/site/hra/help/adult-protective-services.page">Mentally and/or Physically Impaired People (NYC Adult Protective Services)</a></td>
                            <td data-label="Hotline Number">212-630-1853<br></br> Mon - Fri, 9 AM - 5 PM only</td>
                        </tr>
                        <tr>
                            <td data-label="Individuals Needing Assistance"><a href="http://www.newamericans.ny.gov" >Immigrants, Regardless of Immigration Status (NYS Office for New Americans)</a></td>
                            <td data-label="Hotline Number">800-566-7636<br></br> * Assistance available in multiple languages<br></br> Mon - Fri, 9 AM -8 PM only</td>
                        </tr>
                        <tr>
                            <td data-label="Individuals Needing Assistance"><a href="http://www.avp.org" >Lesbian, Gay, Bisexual, Transgender, Queer, and HIV-Affected Individuals (New York City Anti-Violence Project)</a></td>
                            <td data-label="Hotline Number">212-714-1141<br></br> *Spanish language services available</td>
                        </tr>
                    </tbody>
                </table>

                <br></br>
                <br></br>
                <p><b>National Hotlines:</b> National hotlines can provide you with information, resources, and services available outside of New York City or New York State. See below for a list of national hotlines.</p>

                <table className="rt">
                    <tbody>
                        <tr>
                            <th>Individuals Needing Assistance</th> <th>Hotline Number</th>
                        </tr>
                        <tr>
                            <td data-label="Individuals Needing Assistance"><a href="http://www.thehotline.org" >National Domestic Violence Hotline</a></td>
                            <td data-label="Hotline Number">800-799-SAFE (7233)<br></br> TDD: 800-787-3224<br></br> * Assistance available in multiple languages</td>
                        </tr>
                        <tr>
                            <td data-label="Individuals Needing Assistance"><a href="http://www.suicidepreventionlifeline.org" >National Suicide Prevention Lifeline</a></td>
                            <td data-label="Hotline Number">800-273-TALK (8255)<br></br> Spanish: 888-628-9454<br></br> TTY: 800-799-4889</td>
                        </tr>
                        <tr>
                            <td data-label="Individuals Needing Assistance"><a href="https://www.rainn.org" >Rape, Abuse &amp; Incest National Network (RAINN)</a></td>
                            <td data-label="Hotline Number">800-656-HOPE (4673)<br></br> *Spanish language services available</td>
                        </tr>
                        <tr>
                            <td data-label="Individuals Needing Assistance"><a href="https://www.childhelp.org" >National Child Abuse Hotline</a></td>
                            <td data-label="Hotline Number">800-422-4452</td>
                        </tr>
                        <tr>
                            <td data-label="Individuals Needing Assistance"><a href="http://www.pomc.org" >National Organization of Parents of Murdered Children</a></td>
                            <td data-label="Hotline Number">888-818-POMC (7662)</td>
                        </tr>
                        <tr>
                            <td data-label="Individuals Needing Assistance"><a href="http://www.samhsa.gov/find-help/disaster-distress-helpline" >Disaster Distress Helpline (Mass Violence Victims)</a></td>
                            <td data-label="Hotline Number">800-985-5990</td>
                        </tr>
                        <tr>
                            <td data-label="Individuals Needing Assistance"><a href="https://traffickingresourcecenter.org" >National Human Trafficking Resource Center</a></td>
                            <td data-label="Hotline Number">888-373-7888</td>
                        </tr>
                        <tr>
                            <td data-label="Individuals Needing Assistance"><a href="http://www.missingkids.com/Support" >National Center for Missing and Exploited Children</a></td>
                            <td data-label="Hotline Number">800-THE LOST (843-5678)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Contact;