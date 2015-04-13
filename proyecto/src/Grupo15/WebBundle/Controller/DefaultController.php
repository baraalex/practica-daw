<?php

namespace Grupo15\WebBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('Grupo15WebBundle:Default:index.html.twig', array('name' => $name));
    }
}
